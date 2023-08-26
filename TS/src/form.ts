import './style.css';
import { handleForm, fetchdata, init } from './formhandler.ts';

fetchdata();
init();

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<form id="form">
<div>
<label>Name:</label>
<input type="text" name="name">
</div>

<div>
<label>Profession:</label>
<input type="text" name="profession">
</div>

<div>
<label>Address:</label>
<input type="text" name="address">
</div>

<div>
<label>Skills:</label>
<input type="checkbox" name="skills" value="php"> PHP
<input type="checkbox" name="skills" value="ci"> CI
<input type="checkbox" name="skills" value="perl"> Perl
</div>

<div>
<label>Gender:</label>
<input type="radio" name="gender" value="yes"> Yes
<input type="radio" name="gender" value="no"> No
</div>

<button type="submit">Submit</button>
</form>

<div id="online-user"></div>
<div id="offline-user"></div>
<div id="other-user"></div>
`;



handleForm(document.querySelector<HTMLFormElement>('#form')!, document.querySelector<HTMLDivElement>('#other-user')!)
