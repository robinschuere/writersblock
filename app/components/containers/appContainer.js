import React from 'react';
import PropTypes from 'prop-types';
import Button from '../standardComponents/button';
import Icon from '../standardComponents/icon';
import { getInfo } from '../../constants';

class AppContainer extends React.Component {
  render() {
    return (
      <div>
        <h4>What it is?</h4>
        <p>You probably already tried to write a story. But perhaps you started missing something important.</p>
        <h4>Thats Right</h4>
        <p>You probably missed in-depth character personalities and attributes and you thought about keeping it somewhere. But were is where?</p>
        <p>Born from a view to give fellow writers this tool. Writersblock was written.</p>
        <h4>What it can do...</h4>
        <p>Anything? Sadly no. This app is still being improved and not all functions as we would like them to be, are available.</p>
        <h4>What can it do then?</h4>
        <p>D&D fanatics amongst us can use this app for the first functionality: Adding characters and edit their basic information as add and edit attributes. Do you want to try? Then press the button.</p>
        <Button isEdit isLink linkTo="/character">Characters</Button>
        <h4>What about the data?</h4>
        <p>Data is distributed on the device browser memory. So sadly there is no sync between different devices. Yet...</p>
        <h4>
          <Icon name="sunglasses"/> In other News ... <Icon name="sunglasses"/>
        </h4>
        <p>What is under the hood and what am I working on.</p>
        {getInfo.map((info) => {
          return <p>{info.date.toString('DD/MM/YYYY')}<small> {info.description}</small></p>
        })}
      </div>
    );
  }
};

export default AppContainer;