import "./App.css";
import data from "./gharardad.json";

function App() {
  const renderParagraph = (paragraph) => {
    return (
      <p>
        {paragraph?.inputes?.map((item) => (
          <span>
            &nbsp;{item.text} &nbsp; {item.input.value}&nbsp;
          </span>
        ))}
      </p>
    );
  };

  const renderEntity = (entity) => {
    return (
      <>
        <h2>{entity.title}</h2>
        {entity?.paragraphes?.map((paragraph) => renderParagraph(paragraph))}
      </>
    );
  };

  const renderPage = (page) => {
    return (
      <div className="page" style={{ textAlign: "right" }}>
        {page?.entities?.map((entity) => renderEntity(entity))}
        <div className="sign">
          <span>امضاومهر کارگزاری</span>
          <span>امضاومهر مشتری</span>
        </div>
      </div>
    );
  };

  return (
    <div style={{ direction: "rtl" }} className="page">
      <div className="logos">
        {data.logos?.map((logo) => (
          <img src={logo} alt="logo" className="logo" />
        ))}
      </div>
      <h1 className="title">{data.title}</h1>
      {data?.pages?.map((page) => renderPage(page))}
    </div>
  );
}

export default App;
