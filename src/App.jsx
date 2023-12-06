import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [Password, setpassword] = useState("");

  const passwordref = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!'#$%&'()*+,-./:;<=>?@[]^_`{|}~";

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numberAllowed, charAllowed,setpassword]);

  const copyPassword = useCallback(()=>{
    passwordref.current?.select()
    window.navigator.clipboard.writeText(Password)
  },[Password])

  useEffect(()=>{
    passwordGenerator()
  },[length,charAllowed,numberAllowed,passwordGenerator])

  return (
    <>
      <div
        className="w-full text-center max-w-2xl mx-auto px-4 py-10 my-10 rounded-lg text-orange-500 bg-gray-700">

        <h1 className="text-4xl my-2">Password Generator</h1>
        <div className=" flex shadow rounded-lg overflow-hidden m-4">
          <input
            type="text"
            value={Password}
            className="w-full outline-none py-1 px-3 text-lg"
            placeholder="Password"
            readOnly
            ref={passwordref}
          />
          <button onClick={copyPassword} className="outline-none bg-blue-600 text-white text-lg px-5 py-1 shrink-0 hover:opacity-90 transition duration-150">
            Copy
          </button>
        </div>

        <div className="flex px-3 py-5 text-sm gap-x-2  ">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer w-52"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-[1.2rem]">Length:({length}) </label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setnumberAllowed((prev)=>!prev);
              }}
            />
            <label className="text-[1.2rem]">Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setcharAllowed((prev)=>!prev);
              }}
            />
            <label className="text-[1.2rem]">characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
