const App = () => {
  return (
    <div className="container">
      <h1>Note Application</h1>
      <div>
        <input type="text" className="input" placeholder="Title" />
      </div>
      <div>
        <textarea className="textarea" placeholder="Description" />
      </div>
    </div>
  );
};

export default App;
