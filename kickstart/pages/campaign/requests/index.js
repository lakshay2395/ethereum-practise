import React,{Component} from 'react';
import {Button,Table} from 'semantic-ui-react';
import {Link} from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component{

    static async getInitialProps(props){
        const {address} = props.query; 
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();
        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element,index) => {
                return campaign.methods.requests(index).call();
            })
        );
        console.log(requests);
        return {
            address,requests,approversCount
        };
    }

    render(){
        return (
            <Layout>
                <h3>Requests</h3>
                <Link route={`/campaign/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary floated="right" style={{ marginBottom:10}}>Add Request</Button>
                    </a>
                </Link>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Description</Table.HeaderCell>
                            <Table.HeaderCell>Amount</Table.HeaderCell>
                            <Table.HeaderCell>Recipient</Table.HeaderCell>
                            <Table.HeaderCell>Approval Count</Table.HeaderCell>
                            <Table.HeaderCell>Approve</Table.HeaderCell>
                            <Table.HeaderCell>Finalize</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>{this.renderRow()}</Table.Body>
                </Table>
                <div>Found {this.props.requests.length} requests.</div>
            </Layout>
        );
    }

    renderRow(){
        return this.props.requests.map((request,index) => {
            return <RequestRow 
            key={index} 
            id={index}
            request={request}
            address={this.props.address}
            approversCount={this.props.approversCount}
            />;
        })
    }
}

export default RequestIndex;