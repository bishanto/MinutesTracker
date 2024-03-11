import axios from 'axios';
import NavbarComponent from "../components/NavbarComponent/NavbarComponent.js";

export const DragonStatisticsPage = () => {

	var mathMin = 0;
	var readingMin = 0;

function getData(period) {

    axios.post('/dragonstatistics/mathmin/' + period)
    .then(res => {
        mathMin = res.data;
    }).catch(err => console.log(err));

    axios.post('/dragonstatistics/readingmin/' + period)
    .then(res => {
        mathMin = res.data;
    }).catch(err => console.log(err));
}

  return (
    <form>
      <NavbarComponent />
      <h1>Dragon Statistics</h1>
    </form>
  );
};
