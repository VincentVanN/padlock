import { useSelector } from 'react-redux';

function UrlComponent() {
  const { url } = useSelector((state) => state.app);
  return (
    <div>
      Hôte: {url}
    </div>
  );
}

export default UrlComponent;
