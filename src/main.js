import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import ShoppingList from "./screens/ShoppingList";
import AddProduct from "./screens/AddProduct";

const Navigator = createStackNavigator({
  ShoppingList: { screen: ShoppingList },
  AddProduct: { screen: AddProduct }
});

export default class App extends Component {
  render() {
    return <Navigator />;
  }
}
