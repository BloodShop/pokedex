# Pokedex web application

The Pokedex web app provides a dashboard with a list of Pokemon to select from, along with information and images about each Pokemon. Popular among Pokemon fans. Retrieving Pokemon data and organizing them by evolutionary path can be made simple and easy with the use of a Pokedex API.

Single Pokemon            |  Pokedex Dashboard
:-------------------------:|:-------------------------:
![single_pokemon](https://user-images.githubusercontent.com/23366804/214074867-e83bc191-686c-4553-880c-eca68ce6e871.png)  |  ![dashboard](https://user-images.githubusercontent.com/23366804/214074725-04a1f3b6-2373-46b3-8244-c574144378f5.png)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template with redux-toolkit, routing, axios & sass.

## Available Scripts

In the project directory, you can run:

## Initialize Project - downloading dependecies

```
npm install
```

> I have been using Live Sass Compiler inorder to generate to css (Install this extension) and then `Watch sass`

```
npm start
```

## Part of the project
### Searching and categorizing
*Search and categorize Pokemon* are features that allows users to search for specific Pokemon within the inventory, and also allows users to browse Pokemon by category such as grass, fire, water etc. This function would improve the usability and organization of the inventory page and allow for easier navigation and access to Pokemon information:


### *src/featues/pokemons/pokemonTypes.js*

```javascript
const pokemonTypes = ['grass','fire','flying','water','bug','normal','electric','ground','fairy','fighting','psychic','rock','steel','ice','ghost','dragon']
```

### *src/features/pokemons/pokemonFilter.js*

```javascript
/* Pokemons, types & query declarations on Pokedex.jsx */
const { pokemons, isLoading, isError, message } = useSelector((state) => state.pokedex)
const [types, setTypes] = useState(pokemonTypes.reduce((acc, type) => ({ ...acc, [type]: false }), {}))
const [query, setQuery] = useState('')

   ...

export default function pokemonFilter(pokemons, types, query) {
    const filterByQuery = (pokes) => {
        return pokes.filter((pokemon) =>
            query === ""
                ? pokemon
                : pokemon.name.toLowerCase().includes(query.toLowerCase())
        );
    };

    const filterByType = (pokes) => {
        const checkedTypes = Object.entries(types)
            .filter((type) => type[1])
            .map((type) => type[0]);
        return checkedTypes.length > 0
            ? pokes.filter(({ types }) =>
                  types.some((t) => checkedTypes.includes(t))
              )
            : pokes;
    };

    return filterByType(filterByQuery(pokemons));
}
```

## Pokemon Evolution
This function allows for a clear and streamlined view of each Pokemon's evolutionary journey, including their evolution and devolution. Additionally, it helps to better understand Pokemon's characteristics and development.

### *src/featues/pokemons/revolutionary.js*
https://github.com/BloodShop/pokedex/blob/cf66feee9eb6d23a066bf2040618c7afb7af38ca/src/features/pokemons/revolutionary.js#L1-L29

Evoltion Diagram |
:-------------------------:|
![revolution](https://user-images.githubusercontent.com/23366804/214083016-2827bac2-8f5a-4d4f-8ce9-d1d62b505882.png) |


## Sass 7-1 Architecture Pattern

```
sass/
|
|– abstracts/
|   |– _variables.scss       # Sass Variables
|   |– _mixins.scss          # Sass Mixins
|
|– vendors/
|   |– 
|
|– base/
|   |– _utilities.scss
|
|– layout/
|   |– _navigation.scss      # Navigation
|   |– _grid.scss            # Grid system
|   |– _header.scss          # Header
|   |– _footer.scss          # Footer
|   |– _sidebar.scss         # Sidebar
|   |– _forms.scss           # Forms
|
|– components/
|   |– _loader.scss          # Loading spinner
|   |– _pokemonItem.scss     # Pokmon card
|
|– pages/
|   |– _noMatch.scss         # Error page
|   |– _pokemonDetails.scss  # Pokemon details page
|
|– themes/
|   |– 
|
 – main.scss                 # Main Sass input file
```

To learn React, check out the [React documentation](https://reactjs.org/).
