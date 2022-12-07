import './loader.css';

function Loader() {
  return (
    <div
      style={{
        width: '100%',
        height: '65%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span className="loader" />
    </div>
  );
}

export default Loader;
