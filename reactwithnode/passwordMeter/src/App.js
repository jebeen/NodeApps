import {useRef,useEffect,useState} from 'react';

function App() {
  const myRef=useRef('');
  const txtRef=useRef('');
  const meter=useRef(0);
  const [text, setText] = useState('');

  const ValidatePassword = (e) => {
    let errors=[];
    myRef.current.focus();
    setText(e.target.value);

    const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const alphanumeric=/[a-zA-Z0-9]/;
    if (e.target.value.length<5) {
      errors.push('Length should be greater than 5');
      if (!specialChars.test(e.target.value) ) {
        errors.push('Should have atleast one special chars');
      } if (alphanumeric.test(e.target.value)) {
        errors.push('Should have atleast one alphabet and number');
      }
    }  else {
      errors.push('Passed');
    }
    txtRef.current.style.color='green';
    txtRef.current.style.border='1px solid red';
    txtRef.current.style.padding='10px';
    txtRef.current.style.backgroundColor='#ccc';
    txtRef.current.style.width='80%';
    if (errors.length) {
      let error='';
      for (var i=0 ; i< errors.length; i++) {
        error+='<p>'+errors[i]+'</p>';
        let width=errors.length * 20;
        let color='red';
        if (errors[i] == 'Passed') {
          color='blue';
        }
        changeMeter(width, color);
      }
      txtRef.current.innerHTML=error;
    }
  }

    const changeMeter = (width, color) => {
      meter.current.style.width=width+ '%';
      meter.current.style.backgroundColor = color;
    }

  return (
    <div>
      <input ref={myRef} type="text" name="password" onChange={(e)=>ValidatePassword(e)}/>
      <p>Enterd text is : {text}</p>
      <div ref={txtRef}>{txtRef.current.value}</div>
      <div ref={meter} style={
        { border: '1px solid green',
          margin:'10px',
          borderRadius:'50px',
          width:'80%',
          height: '20px'}
        }>
      </div>
    </div>
  );
}

export default App;
