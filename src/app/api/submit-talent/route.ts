import {
  NextResponse
} from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

// Schema for validating the incoming submission data
const submissionSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  role: z.string().min(1, { message: "Role is required." }),
  linkedinUrl: z.string().url({ message: "Invalid LinkedIn URL." }),
  githubUrl: z.string().url({ message: "Invalid GitHub URL." }),
  profilePictureUrl: z.string().url({ message: "Invalid Profile Picture URL." }),
  skills: z.array(z.string().min(1)).min(1, { message: "At least one skill is required." }),
  biography: z.string().min(20, { message: "Biography must be at least 20 characters." }),
});

// Configure the email transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Generates the Markdown file content from the validated data.
 * @param data The validated form data.
 * @returns A string containing the formatted Markdown content.
 */
const generateMarkdown = (data: z.infer<typeof submissionSchema>) => {
  const { name, role, linkedinUrl, githubUrl, profilePictureUrl, skills, biography } = data;

  // Generates a URL-friendly slug from the name (e.g., "Jane Doe" -> "jane-doe")
  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const frontmatter = `---
name: "${name}"
role: "${role}"
profilePictureUrl: "${profilePictureUrl}"
skills:
${skills.map(skill => `  - "${skill}"`).join('\n')}
githubUrl: "${githubUrl}"
linkedinUrl: "${linkedinUrl}"
---
`;

  const markdownContent = `${frontmatter}\n\n${biography}`;
  return { slug, content: markdownContent };
};

/**
 * API route handler for POST requests to /api/submit-talent.
 * @param request The incoming request object.
 * @returns A response object.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = submissionSchema.parse(body);

    const { slug, content } = generateMarkdown(validatedData);

    // Send the email with the generated markdown as an attachment
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.EMAIL_TO,
      subject: `New Talent Submission: ${validatedData.name}`,
      html: `
        <h1>New Talent Profile Submission</h1>
        <p>A new profile has been submitted by <strong>${validatedData.name}</strong>.</p>
        <p>The generated Markdown file (<strong>${slug}.md</strong>) is attached for your review.</p>
      `,
      attachments: [
        {
          filename: `${slug}.md`,
          content: content,
          contentType: 'text/markdown',
        },
      ],
    });

    return NextResponse.json({ message: 'Submission received successfully!' }, { status: 200 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return detailed validation errors to the client
      return NextResponse.json({ errors: error.issues }, { status: 400 });
    }

    // Generic error for any other issues
    console.error('Internal Server Error in talent submission:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
