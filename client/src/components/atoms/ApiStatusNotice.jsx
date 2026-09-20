export default function ApiStatusNotice({ message, onRetry }) {
  if (!message) return null;

  return (
    <section className="api-status-notice" role="alert">
      <div>
        <strong>Live data unavailable</strong>
        <p>{message}</p>
      </div>
      <button className="api-status-notice__retry" onClick={onRetry}>Retry</button>
    </section>
  );
}
