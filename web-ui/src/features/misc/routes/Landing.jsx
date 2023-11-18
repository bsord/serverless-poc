import { CenteredLayout } from "../../../components/Layouts";
import { Typography } from "../../../components/Elements";

export const Landing = () => {
  return (
    <CenteredLayout title="Welcome">
      <div className="text-center">
        <Typography variant="h3">Welcome!</Typography>
      </div>
    </CenteredLayout>
  );
};