const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader" style={{ backgroundColor: "#1b1b1dff" }}></div>
      <div className="text-purple-500 m-2">
        Generating Review... Please Wait...
      </div>
    </div>
  );
};

export default Loader;
