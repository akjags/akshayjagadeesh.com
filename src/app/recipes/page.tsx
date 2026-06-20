import { PasscodeGate } from "@/components/PasscodeGate";
import { RecipeBrowser } from "@/components/RecipeBrowser";
import { isUnlocked } from "@/lib/auth";
import { recipes } from "@/lib/content";

export const metadata = {
  title: "Recipe Notebook",
  description: "Private searchable recipe notebook.",
  robots: { index: false, follow: false },
};

export default async function RecipesPage() {
  if (!(await isUnlocked())) {
    return (
      <PasscodeGate
        title="Recipe notebook"
        description="Enter passcode"
        redirectTo="/recipes"
      />
    );
  }

  return <RecipeBrowser recipes={recipes} />;
}
