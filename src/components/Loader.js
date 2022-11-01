const Loader = () => {
  return (
    <div style={{ margin: "20px 0", textAlign: "center" }}>
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
export default Loader;
