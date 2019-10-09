import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class CustomInterface extends Component {

    constructor() {
        super();

        this.state = {
            currentTab: 0,
            prefillPhone: ''
        }
    }

    dispatchIframe() {
        return { __html: `<iframe class="airtable-embed" src="https://beacon.trekmedics.org/dashboard" width="100%" height="${window.innerHeight}"><iframe>` }
    }
    
    intakeIframe () {
        return { __html: `<iframe class="airtable-embed" src="https://airtable.com/embed/shrww4Ej1FLEwhW6c?backgroundColor=red&prefill_Phone=${this.state.prefillPhone}" width="100%" height="${window.innerHeight}"><iframe>` }
    }

    donationDistribution () {
        return { __html: `<iframe class="airtable-embed" src="https://airtable.com/embed/shrfhjKnaBinh7ONa?backgroundColor=red&viewControls=on" width="100%" height="${window.innerHeight}"><iframe>` }
    }

    componentWillReceiveProps (props) {

        if (props.task) {
            let tabIndex = parseInt(props.task.attributes.callType) - 1;

            this.setState({
                currentTab: tabIndex,
                prefillPhone: props.task.attributes.name
            });
        }
        console.log('Our task: ', this.props.task);
    }

    changeTab (tabIndex) {
        this.setState({
            currentTab: tabIndex
        })
    }

    render() {
        return(
            <Tabs selectedIndex={this.state.currentTab} onSelect={(tabIndex) => this.changeTab(tabIndex)} >
                <TabList>
                    <Tab>Dispatch</Tab>
                    <Tab>Donation Intake</Tab>
                    <Tab>Donation Distribution</Tab>
                </TabList>
                <TabPanel>
                    <div dangerouslySetInnerHTML={this.dispatchIframe()} />
                </TabPanel>
                <TabPanel>
                    <div dangerouslySetInnerHTML={this.intakeIframe()} />
                </TabPanel>
                <TabPanel>
                    <div dangerouslySetInnerHTML={this.donationDistribution()} />
                </TabPanel>
            </Tabs>
        );
    }
}

export default CustomInterface;