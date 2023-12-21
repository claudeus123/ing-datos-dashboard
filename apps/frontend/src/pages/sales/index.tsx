// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

import { models } from 'powerbi-client';
import React from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';

class SalesPage extends React.Component {
  private report: models.IReport | undefined;

  render() {
    return (
      <ApexChartWrapper>
        <PowerBIEmbed
        embedConfig={{
          type: 'report',
          id: '<Report Id>',
          embedUrl: '<Embed Url>',
          accessToken: '<Access Token>',
          tokenType: models.TokenType.Embed,
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: false,
              },
            },
            background: models.BackgroundType.Transparent,
          },
        }}
        eventHandlers = {
          new Map([
            ['loaded', function () {console.log('Report loaded');}],
            ['rendered', function () {console.log('Report rendered');}],
            ['error', function (event) {console.log(event!.detail);}],
            ['visualClicked', () => console.log('visual clicked')],
            ['pageChanged', (event) => console.log(event)],
          ])
        }
        cssClassName="reportClass"
        getEmbeddedComponent={(embeddedReport) => {
          this.setState({ report: embeddedReport });
        }}
      />
      </ApexChartWrapper>
    )
  }
}

export default SalesPage;