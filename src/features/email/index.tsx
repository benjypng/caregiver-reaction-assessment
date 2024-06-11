import { Link } from '@react-email/link';

import { getBaseUrl } from '@/utils/trpc-hooks';

interface EmailTemplateProps {
  resultId: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  resultId,
}) => {
  const url = `${getBaseUrl()}/cra-results/${resultId}`;

  return (
    <div>
      <h1>The Link to your Caregiver Reaction Assessment is Ready.</h1>
      <p>
        You can find it here: <Link href={url}>{url}</Link>
      </p>
    </div>
  );
};
