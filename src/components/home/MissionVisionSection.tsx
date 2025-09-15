/**
 * @file A component to display the club's mission and vision.
 * @author Leo <leo@snippets.com>
 * @copyright Copyright (c) 2025, Leo
 * @license MIT
 */

// SVG Icon for Mission (Target)
const MissionIcon = () => (
  <svg
    className="w-12 h-12 mx-auto mb-4 text-brand-blue"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 21a9 9 0 100-18 9 9 0 000 18z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15a3 3 0 100-6 3 3 0 000 6z"
    />
  </svg>
);

// SVG Icon for Vision (Eye)
const VisionIcon = () => (
  <svg
    className="w-12 h-12 mx-auto mb-4 text-brand-blue"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    ></path>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    ></path>
  </svg>
);

/**
 * A section component for the homepage that displays the club's mission and vision.
 * @returns The rendered MissionVisionSection component.
 */
export function MissionVisionSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
          <div>
            <MissionIcon />
            <h2 className="text-3xl md:text-4xl text-brand-dark-blue font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To bridge the gap between academic theory and real-world industry
              demands by providing members with hands-on project experience,
              mentorship, and the collaborative skills needed to excel in tech
              careers.
            </p>
          </div>
          <div>
            <VisionIcon />
            <h2 className="text-3xl md:text-4xl text-brand-dark-blue font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be the university&apos;s most respected and effective launchpad for
              aspiring tech professionals, recognized by top employers as a
              premier source of industry-ready talent.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
