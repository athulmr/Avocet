# Setting up Mongoose DB

## Create DB and Create user
```
use rpos
db.createUser( { user: "masterChef",
                 pwd: "90IqJ8ikNnRsyLj",
                 roles: [ { role: "clusterAdmin", db: "admin" },
                          { role: "readAnyDatabase", db: "admin" },
                          "readWrite"] },
               { w: "majority" , wtimeout: 5000 } )
```

# Sample mutations

## create user
```
mutation {
  createOwner(ownerInput: {name: "Athul", email: "athul@mail.com", phone: "8148405590", pwd: "passme"}) {
    data{
      _id
      name
    }
    error
  }
}
```

## Create Restaurant
```
mutation {
  createRestaurant(restaurantInput: {name: "Knight Riders", code: "KNR", address: "BTM Layout, Bangalore", phone: "8148405590", email: "contact@knightriders.com", owner: "5d485e8f75cf944193344f2f"}) {
    data
    error
  }
}
```

## Create Menu
```
mutation {
  createMenu(menuInput: {restaurant: "5d485f9775cf944193344f30", name: "Main Menu"}) {
    _id
  }
}
```

## Create Category
```
mutation {
  createCategory(categoryInput: {menu: "5d486a1df1332a6799944188", name: "Main Course"}) {
    _id
  }
}
```

## Create Item
```
mutation {
  createItem(itemInput: {category: "5d486fed9b509e7463ec293b", name: "Malai tikka", code: "MTKK", price: 129}) {
    _id
  }
}
```

# Sample Queries

## Get Restaurant
```
{
  restaurants(restaurant: {_id: "5d486a10f1332a6799944187"}) {
    data {
      _id
      menus {
        name
        categories {
          _id
        }
      }
    }
    error
  }
}
```

## Get Menu
```
{
  menu(menu: {restaurant: "5d486a10f1332a6799944187"}) {
    _id
    name
    categories {
      _id
    }
  }
}
```

## Get Category
```
{
  categories(category: {menu: "5d48781a53043204c9edb731"}) {
    _id
    name
    items {
      _id
    }
  }
}
```

## Get Items
```
{
  items(item: {category: "5d48e34cb2982b55502267a1"}) {
    _id
    name
    code
    price
  }
}
```




