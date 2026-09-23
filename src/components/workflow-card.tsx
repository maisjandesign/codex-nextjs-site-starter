export function WorkflowCard({ index, title, description, note }: {
  index: string; title: string; description: string; note: string;
}) {
  return <article className="workflow-card">
    <span className="index">{index}</span>
    <h3>{title}</h3>
    <p>{description}</p>
    <p className="muted">{note}</p>
  </article>;
}
