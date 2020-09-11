import React, { Component } from "react";
import { graphql } from 'react-apollo';
import { QuerySearchPicture } from "../GraphQL";

import { Form, Icon, Table, Button, Loader } from 'semantic-ui-react'

import { Storage } from 'aws-amplify';

class SearchPhoto extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            searchQuery: '' 
        }
    }    
    
    onChange = (e) => {
        if(e.target.value)
        {
        this.setState({ searchQuery: e.target.value });
        }
        else{
        this.setState({ searchQuery: "" });
        }        
    }

    handleSubmit = () =>
    {
        this.props.onSearch(this.state.searchQuery);
    }

    render(){
        const { items } = this.props.data.listPictures        
        return (
            <React.Fragment>
            <div>
                <fieldset>
                    <Form>
                        <Form.Group >
                            <Form.Input type="text" style={{width:"500px"}} onChange={this.onChange.bind(this)}></Form.Input>
                            <Form.Button type="submit" onClick={this.handleSubmit}>Search</Form.Button>
                        </Form.Group>
                    </Form>
                </fieldset>
            </div>
            
            <Table celled={true}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell><Icon name={'key'} /> PhotoId</Table.HeaderCell>
                        <Table.HeaderCell><Icon name={'info'} />Friendly name</Table.HeaderCell>
                        <Table.HeaderCell><Icon name={'eye'} />Visibility</Table.HeaderCell>
                        <Table.HeaderCell><Icon name={'user'} />Owner</Table.HeaderCell>
                        <Table.HeaderCell><Icon name={'calendar'} />Created at</Table.HeaderCell>
                        <Table.HeaderCell> <Icon name={'download'} />Download</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {items && [].concat(items).sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map(photo => (
                        <Table.Row key={photo.id}>
                            <Table.Cell>{photo.file && photo.id}</Table.Cell>
                            <Table.Cell>{photo.name}</Table.Cell>
                            <Table.Cell>{photo.visibility}</Table.Cell>
                            <Table.Cell>{photo.owner}</Table.Cell>
                            <Table.Cell>{photo.file && photo.createdAt}</Table.Cell>
                        </Table.Row>
                    ))}                        
                </Table.Body>
            </Table>
        </React.Fragment>  
        )
    }
}

export default graphql(    
    QuerySearchPicture,
    {
        options : {
            fetchPolicy: 'cache-and-network'
        },
        props: (props) => ({
            onSearch: searchQuery => {
              return props.data.fetchMore({
                query: QuerySearchPicture,
                variables: {
                  searchQuery
                },
                updateQuery: (previousResult, { fetchMoreResult }) => ({
                  ...previousResult,
                  listPictures: {
                    ...previousResult.listPictures,
                    items: fetchMoreResult.listPictures.items
                  }                  
                })                
              })
            },
            data: props.data
        })
    }
)(SearchPhoto);