import web3 from './web3';
import CampaignFactory from './build/CampaignFactory';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xFC9D91262966634Fa1196F52693975CEEdf82FaD'
)

export default instance;
