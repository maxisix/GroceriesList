import React, { Component } from "react";
import { Alert, FlatList } from "react-native";
import {
  Body,
  Container,
  Content,
  Right,
  Text,
  CheckBox,
  List,
  ListItem,
  Fab,
  Icon
} from "native-base";

export default class ShoppingList extends Component {
  static navigationOptions = {
    title: "My Groceries List"
  };

  state = {
    products: [
      { id: 1, name: "bread", gotten: null },
      { id: 2, name: "eggs", gotten: null }
    ]
  };

  _handleProductPress = product => {
    this.state.products.forEach(p => {
      if (product.id === p.id) {
        p.gotten = !p.gotten;
      }
      return p;
    });

    this.setState({ products: this.state.products });
  };

  _handleAddProductPress = () => {
    this.props.navigation.navigate("AddProduct", {
      addProduct: product => {
        this.setState({
          products: [...this.state.products, product]
        });
      },
      deleteProduct: product => {
        this.setState({
          products: this.state.products.filter(p => p.id !== product.id)
        });
      },
      productsInList: this.state.products
    });
  };

  _handleClearPress = () => {
    Alert.alert("Clear all items?", null, [
      { text: "Cancel" },
      { text: "Ok", onPress: () => this.setState({ products: [] }) }
    ]);
  };

  render() {
    return (
      <Container>
        <Content>
          <List>
            <FlatList
              data={this.state.products}
              extraData={this.state}
              renderItem={({ item }) => (
                <ListItem onPress={this._handleProductPress.bind(null, item)}>
                  <Body>
                    <Text style={{ color: item.gotten ? "#bbb" : "#000" }}>
                      {item.name}
                    </Text>
                  </Body>
                  <Right>
                    <CheckBox
                      checked={item.gotten}
                      onPress={this._handleProductPress.bind(null, item)}
                    />
                  </Right>
                </ListItem>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </List>
        </Content>
        <Fab
          style={{ backgroundColor: "#5067FF" }}
          position="bottomRight"
          onPress={this._handleAddProductPress}
        >
          <Icon name="add" />
        </Fab>
        <Fab
          style={{ backgroundColor: "red" }}
          position="bottomLeft"
          onPress={this._handleClearPress}
        >
          <Icon ios="ios-remove" android="md-remove" />
        </Fab>
      </Container>
    );
  }
}
