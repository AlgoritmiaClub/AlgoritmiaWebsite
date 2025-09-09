# Data Schemas

This document defines the data structure for the Markdown files used as the project's database.

## Member Schema

Represents a member of the Algoritmia Club. Each member will have their own file in `/content/members/`. The filename (e.g., `jane-doe.md`) will be used as the member's unique ID.

**File:** `/content/members/{member-id}.md`

### Frontmatter Fields

```yaml
name: "Jane Doe"
role: "Software Engineer"
profilePictureUrl: "/images/members/jane-doe.jpg"
skills:
  - "TypeScript"
  - "React"
  - "Next.js"
  - "Node.js"
githubUrl: "https://github.com/janedoe"
linkedinUrl: "https://linkedin.com/in/janedoe"
```

### Body Content

The body of the markdown file will be used for the member's detailed biography.

---

## Success Story Schema

Represents a member's successful internship or job placement.

**File:** `/content/stories/{story-id}.md`

### Frontmatter Fields

```yaml
memberId: "jane-doe"
company: "Tech Solutions Inc."
companyLogoUrl: "/images/companies/tech-solutions.svg"
quote: "Algoritmia Club was instrumental in helping me land my dream internship. The mock interviews and project experience were invaluable."
isFeatured: true
```

### Body Content

The body content for a success story is currently not used but is reserved for a potential future case study or longer-form story.
