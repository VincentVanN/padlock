import useUrl from '../../hooks/useUrl';

function UrlComponent() {
  const url = useUrl();
  return (
    <div>
      Hôte: {url}
    </div>
  );
}

export default UrlComponent;
