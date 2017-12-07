import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

class FoodbanksIndex extends React.Component {
  state = {
    foodbanks: []
  }

  componentDidMount() {
    Axios
    .get('/api/foodbanks')
    .then(res => this.setState({ foodbanks: res.data }))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="page-banner col-md-12">
            <div>
              {this.state.foodbanks.map(foodbank => {
                return (
                  <div key={foodbank.id} className="image-tile col-md-4 col-sm-6 col-xs-12">
                    <Link to={`/foodbanks/${foodbank.id}`}>
                      <img src={foodbank.image} className="img-responsive" />
                    </Link>
                    <h2>{foodbank.name}</h2>
                    <h3>{foodbank.location.address}</h3>
                    <h4>{foodbank.telephone_number}</h4>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FoodbanksIndex;
