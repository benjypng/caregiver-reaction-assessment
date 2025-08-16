interface EmailTemplateProps {
  resultId: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  resultId,
}) => {
  return (
    <div>
      <h1>{`The Link to your Caregiver Reaction Assessment is Ready: ${resultId}.`}</h1>
    </div>
  )
}
