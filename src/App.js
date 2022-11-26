import React from 'react';
import Tesseract from 'tesseract.js';

import './style.css';
import './card.css';

function check(text) {
  const p = "para";
  const v = text.toLowerCase()
  const a = "ventolin"
  const h = "hydroc"

  if (v.includes(p)) {
    return (
    <div class="card">
        <div className="imgBx">
            <img src="https://img.freepik.com/premium-vector/tablet-capsule-medicine-icon-illustration-healthcare-medical-icon-concept-isolated_138676-882.jpg?w=2000"></img>
        </div>
        <div className="content">
        <div className="details">
            <h2>
                Paracetamol<br></br><span>treat fever and mild pain </span>
            </h2>
            <div className="data">
                An analgesic and antipyretic drug that is used to temporarily relieve mild-to-moderate pain and fever. It is commonly included as an ingredient in cold and flu medications and is also used on its own.


            </div>

            <div className="actionBtn">
                <button>Buy Now</button>
                <button>Know more</button>
            </div>
        </div>

        </div>


    </div>
    )
  }

  if (v.includes(a)) {
    return <h1>ventolin</h1>;
  }
  if (v.includes(h)) {
    return <h1>hydrocodone</h1>;
  }
 
}



const App = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [image, setImage] = React.useState('');
  const [text, setText] = React.useState('');
  const [progress, setProgress] = React.useState(0);
 console.log(text)


  const handleSubmit = () => {
    setIsLoading(true);
    Tesseract.recognize(image, 'eng', {
      logger: (m) => {
        console.log(m);
        if (m.status === 'recognizing text') {
          setProgress(parseInt(m.progress * 100));
        }
      },
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        console.log(result.data);
        setText(result.data.text);
        setIsLoading(false);
      });
  };

  return (
    
    <div className="container" style={{ height: '100vh' }}>
      <div className="row h-100">
        <div className="col-md-5 mx-auto h-100 d-flex flex-column justify-content-center">
          {!isLoading && (
            <h1 className="text-center py-5 mc-5">Medicine finder</h1>
          )}
          {isLoading && (
            <>
              <progress className="form-control" value={progress} max="100">
                {progress}%{' '}
              </progress>{' '}
              <p className="text-center py-0 my-0">Converting:- {progress} %</p>
            </>
          )}
          {!isLoading && !text && (
            <>
              <input
                type="file"
                onChange={(e) =>
                  setImage(URL.createObjectURL(e.target.files[0]))
                }
                className="form-control mt-5 mb-2"
              />
              <input
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary mt-5"
                value="Find"
              />
            </>
          )}
          {!isLoading && text && (
            <>
           <div>
              {check(text)}
            </div>
              {/* <textarea
                className="form-control w-100 mt-5"
                rows="30"
                value={text}
                onChange={(e) => setText(e.target.value)}
                

              ></textarea> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
