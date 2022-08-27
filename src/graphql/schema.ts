import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import fakedata from './fakedata.json';

const carType = new GraphQLObjectType({
  name: 'Car',
  fields: {
    make: {type: GraphQLString},
    model: {type: GraphQLString},
    year: {type: GraphQLInt},
  },
});

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {type: GraphQLInt},
    first_name: {type: GraphQLString},
    last_name: {type: GraphQLString},
    age: {type: GraphQLInt},
    email: {type: GraphQLString},
    gender: {type: GraphQLString},
    ip_address: {type: GraphQLString},
    language: {type: GraphQLString},
    car: {type: carType},
  },
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(userType),
      args: {
        id: {type: GraphQLInt},
      },
      resolve: (_, {id}) => {
        return !id ? fakedata : fakedata.filter((user) => user.id === id);
      },
    },
  },
});

export default new GraphQLSchema({
  query: queryType,
});
