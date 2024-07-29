# Angular application with editable users list

The application contains the editable list of users as an example how it can be done using modern Angular with NxRx as a state management tool.

## Run application

```shell
npm install
ng build data-access
npm start
```

## Implementation details

### Testing

The code in this repo was implemented using a TDD approach to save time on debug and guarantee the described logic stability.

The tests use component test harnesses. It allows to interact with a component via a supported API in the way a user would do.
Harnesses simplify this interaction, and move the interaction code to a separate Harness class, making it reusable, and improving the readability of the test code.

The tests also use the concept of test utils. Utils allow to wrap the repeated code into usable functions, that are easy to read, reuse and maintain.
The test written with the help of a harness and a util should be concise, and really easy readable, but it also should provide enough details to understand what's going on.
It follows the AAA (arrange, act, assert) pattern.

Tests do not overuse mocks. The testing approach used in the project is kind of black box testing. For a particular feature, you have data from one side, and you test the user interface on the other side.
It gives you freedom to refactor the code without being afraid to break something or forget something. Tests don't care if you use one service or another.
Tests don't care if you use a component store or a signals store. If you don't change the behavior from the user's point of view, you're free to change the implementation, relying on tests.

### State management

The project uses the NgRx component store for Users state management. As users data used to build a CRUD functionality, it is likely to be used inside the component only.
For this kind of data component store sounds like an excellent solution. RxJs entity management sounds like a good thing for CRUD operations,
but it usually is used with @rxjs/store. In this project I tried to integrate it into the component store. While simplifying some things, it still lives some space for code/approach improvements.
The store is provided on the level of the UsersComponent, so when you leave the index route, the component store is destroyed, and all the data from the store is removed from memory.

### Data access library

In this project I tried to replicate the approach being a best practise for NX projects.
All the domain related code resides in the separate library "data-access". It is beneficial in several ways:
- domain-related code is not mixed with application code
- it is highly reusable, making it instantly available for any new applications
- you get it in absolutely no cost, it is not more difficult than creating a service in the application
- the code is sorted by domain, it's easy to navigate, and it enhances all benefits of DDD
- you can enforce module boundaries using a Sheriff tool (in nx it is built-in)

You can see the duplication of the User interface, and it is intentional. In the real application the interfaces could be slightly different.
I strongly believe that all types that come from the data access library shouldn't go further than your store.
Store should take the data from the data-access entry point, and transform it to the form convenient for the application. This way you guarantee you can
easily change the data source from one endpoint to another, or even change the source type from REST API to graphql. The only change needed now is in the store, you don't need to change the typescript and templates of dozens of components.

