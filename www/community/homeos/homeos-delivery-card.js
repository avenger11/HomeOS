class HomeOSDeliveryCard extends HTMLElement {
  setConfig(config) {
    if (!config.entities || !Array.isArray(config.entities) || config.entities.length === 0) {
      throw new Error('You need to define an array of entities');
    }
    this.config = config;
  }

  getCardSize() {
    // Adjust the card size based on the number of entities
    return this.config.entities.length * 3;
  }

  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      const style = document.createElement('style');
      this.content = document.createElement('div');

      // card.header = this.config.title != null ? this.config.title : 'Status de livraison';

      style.innerHTML = `
        ha-card {
          background: var(--homeos-card-background);
          backdrop-filter: var(--homeos-card-backdrop-filter);
          border-radius: var(--homeos-card-border-radius);
          box-shadow: var(--homeos-card-box-shadow);
          border-style: var(--homeos-card-border-style);
          border-color: var(--homeos-card-border-color);
          height: var(--homeos-card-grid-square);
          overflow: auto;
        }
        table {
          width: 100%;
          padding: 0.5vw;
          
        }
        thead {
          text-align: left;
          display: block;
          
        }
        tbody {
        }
        tbody tr {
          margin: 0 0 2px 0;
          display: flex;
          border-radius: 1.25vw;
          height: 2.5vw;
          align-items: center;
        }
        #title {
          color: var(--homeos-card-text-color);
          font-size: 1.5vw;
          font-weight: normal;
          width: 14vw;
          padding-left: 0.6vw;
        }
        #tracking-count {
          text-align: right;
          color: var(--homeos-card-text-color);
          font-size: 1.5vw;
          font-weight: normal;
          width: 4vw;
        }
        #iconcard {
          align-self: normal;
          display: flex;
        }
        #svg-iconcard {
          width: 1.9vw;
        }
        #description {
          padding-left: 1vw; 
          text-align: left;
          width: 11vw;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        #status {
          text-align: right;
          width: 6.5vw;
        }
        #icon {
          align-self: normal;
          padding: 0.1vw 0 0 0.2vw;
          width: 1.9vw;
        }

      `;

      card.appendChild(this.content);
      this.appendChild(style);
      this.appendChild(card);
    }

    let rowCount = 0

    const content = this.config.entities
      .map(entityId => {
        const state = hass.states[entityId];
        const packages = state.attributes.packages != null ? state.attributes.packages : [];
        rowCount += packages.length;

        return packages.map(elem => {

          // Conditionally set the background color based on the status
          const backgroundColor = elem.status === 'Ready to be Picked Up' ? 'white' : 'var(--homeos-card-background-revert)';
          const textColor = elem.status === 'Ready to be Picked Up' ? 'black' : 'var(--homeos-card-text-color-revert)';
          

          return`
            <tr style="background-color: ${backgroundColor};">
              <td id="description" style="color: ${textColor}; opacity: ${elem.status === 'Delivered' ? '0.5' : '1.0'}">
                ${elem.friendly_name != null && elem.friendly_name != '' ? elem.friendly_name : elem.tracking_number}
              </td>
              <td id="status" style="color: ${textColor}; opacity: ${elem.status === 'Delivered' ? '0.5' : '1.0'}">
                ${elem.status === 'In Transit' ? 'Expédié' : ''}
                ${elem.status === 'Ready to be Picked Up' ? 'Aujourd hui' : ''}
                ${elem.status === 'Delivered' ? 'Livré' : ''}
              </td>
              <td id="icon" class="icon-cell">
                ${elem.status === 'In Transit' ? '<svg width="28" height="28" viewBox="0 0 28 28"><path style="fill: var(--homeos-icon-color-primary-revert)" d="M13.9531 25.9062C20.4922 25.9062 25.9062 20.4805 25.9062 13.9531C25.9062 7.41406 20.4805 2 13.9414 2C7.41406 2 2 7.41406 2 13.9531C2 20.4805 7.42578 25.9062 13.9531 25.9062ZM13.9531 23.9141C8.42188 23.9141 4.00391 19.4844 4.00391 13.9531C4.00391 8.42188 8.41016 3.99219 13.9414 3.99219C19.4727 3.99219 23.9141 8.42188 23.9141 13.9531C23.9141 19.4844 19.4844 23.9141 13.9531 23.9141ZM21.5703 13.9648C21.5703 13.1797 20.5391 12.582 19.2617 12.582H16.7539C16.4492 12.582 16.3555 12.5469 16.1562 12.3359L11.9844 7.78906C11.832 7.61328 11.6445 7.53125 11.4336 7.53125H10.707C10.4609 7.53125 10.3203 7.75391 10.4258 8L12.5117 12.6055L9.59375 12.9453L8.50391 10.9531C8.39844 10.7656 8.23438 10.6719 7.97656 10.6719H7.70703C7.48438 10.6719 7.33203 10.8242 7.33203 11.0469V16.8711C7.33203 17.0938 7.48438 17.2461 7.70703 17.2461H7.97656C8.23438 17.2461 8.39844 17.1523 8.50391 16.9766L9.59375 14.9844L12.5117 15.3125L10.4258 19.918C10.3203 20.1641 10.4609 20.3867 10.707 20.3867H11.4336C11.6445 20.3867 11.832 20.3047 11.9844 20.1406L16.1562 15.5938C16.3555 15.3828 16.4492 15.3359 16.7539 15.3359H19.2617C20.5391 15.3359 21.5703 14.7383 21.5703 13.9648Z"/></path></svg>' : ''}
                ${elem.status === 'Ready to be Picked Up' ? '<svg width="35" height="28" viewBox="0 0 35 28"><path style="fill: black" d="M13.9531 25.9062C20.4922 25.9062 25.9062 20.4805 25.9062 13.9531C25.9062 7.41406 20.4805 2 13.9414 2C7.41406 2 2 7.41406 2 13.9531C2 20.4805 7.42578 25.9062 13.9531 25.9062ZM13.9531 23.9141C8.42188 23.9141 4.00391 19.4844 4.00391 13.9531C4.00391 8.42188 8.41016 3.99219 13.9414 3.99219C19.4727 3.99219 23.9141 8.42188 23.9141 13.9531C23.9141 19.4844 19.4844 23.9141 13.9531 23.9141ZM14.375 20.6094C14.4219 20.5977 14.457 20.5742 14.4922 20.5508L19.2969 17.8203C19.8477 17.4922 20.1758 17.1641 20.1758 16.2852V11.5039C20.1758 11.3398 20.1641 11.1758 20.1172 11.0469L14.375 14.3281V20.6094ZM13.5312 20.6094V14.3281L7.78906 11.0469C7.75391 11.1758 7.75391 11.3398 7.75391 11.5039V16.2852C7.75391 17.1641 8.05859 17.4922 8.60938 17.8203L13.4141 20.5508C13.4492 20.5742 13.4844 20.5977 13.5312 20.6094ZM13.9531 13.6016L16.5664 12.1133L10.7773 8.80859L8.52734 10.0977C8.38672 10.1562 8.26953 10.2383 8.1875 10.332L13.9531 13.6016ZM17.4219 11.6328L19.7188 10.332C19.6367 10.2383 19.5195 10.1562 19.3789 10.0977L15.0664 7.625C14.6914 7.40234 14.3164 7.29688 13.9531 7.29688C13.6016 7.29688 13.2266 7.40234 12.8516 7.625L11.5977 8.32812L17.4219 11.6328Z"/></path></svg>' : ''}
                ${elem.status === 'Delivered' ? '<svg width="28" height="28" viewBox="0 0 28 28"><path style="fill: var(--homeos-icon-color-primary-revert); opacity: 0.5;" d="M13.9531 25.9062C20.4922 25.9062 25.9062 20.4805 25.9062 13.9531C25.9062 7.41406 20.4805 2 13.9414 2C7.41406 2 2 7.41406 2 13.9531C2 20.4805 7.42578 25.9062 13.9531 25.9062ZM13.9531 23.9141C8.42188 23.9141 4.00391 19.4844 4.00391 13.9531C4.00391 8.42188 8.41016 3.99219 13.9414 3.99219C19.4727 3.99219 23.9141 8.42188 23.9141 13.9531C23.9141 19.4844 19.4844 23.9141 13.9531 23.9141ZM12.6641 19.5195C13.0508 19.5195 13.3789 19.332 13.6133 18.9688L18.9688 10.543C19.0977 10.3086 19.25 10.0508 19.25 9.79297C19.25 9.26562 18.7812 8.92578 18.2891 8.92578C17.9961 8.92578 17.7031 9.11328 17.4805 9.45312L12.6172 17.2578L10.3086 14.2695C10.0273 13.8945 9.76953 13.8008 9.44141 13.8008C8.9375 13.8008 8.53906 14.2109 8.53906 14.7266C8.53906 14.9844 8.64453 15.2305 8.80859 15.4531L11.668 18.9688C11.9609 19.3555 12.2773 19.5195 12.6641 19.5195Z"/></path></svg>' : ''}
                </td>
            </tr>
          `;
        }).join('');
      })
      .join('');

    this.content.innerHTML = `
      <table>
        <thead>
          <tr>
            <th id="title">Status de livraison</th>
            <th id="tracking-count">
              ${rowCount}
            </th>
            <th id="iconcard">
              <svg id="svg-iconcard" width="28" height="28" viewBox="0 0 28 28">
                <path style="fill: var(--homeos-icon-color-primary)" d="M14.6914 26.7695C14.7734 26.7461 14.8438 26.7109 14.9258 26.6641L24.1016 21.4375C25.1914 20.8164 25.7773 20.1836 25.7773 18.4844V9.35547C25.7773 9.00391 25.7539 8.72266 25.6836 8.46484L14.6914 14.7461V26.7695ZM13.0859 26.7695V14.7461L2.09375 8.46484C2.02344 8.72266 2 9.00391 2 9.35547V18.4844C2 20.1836 2.59766 20.8164 3.67578 21.4375L12.8633 26.6641C12.9336 26.7109 13.0039 26.7461 13.0859 26.7695ZM13.8945 13.3398L18.8984 10.5039L7.80078 4.16406L3.5 6.61328C3.24219 6.75391 3.03125 6.89453 2.84375 7.07031L13.8945 13.3398ZM20.5273 9.57812L24.9336 7.07031C24.7578 6.89453 24.5469 6.75391 24.2891 6.61328L16.0156 1.90234C15.3008 1.49219 14.5859 1.26953 13.8945 1.26953C13.1914 1.26953 12.4766 1.49219 11.7617 1.90234L9.38281 3.25L20.5273 9.57812Z"/></path>
              </svg>
            </th>
          </tr>
        </thead>
      <tbody>
        ${content}
      </tbody>
      </table>
    `;


  }
}

customElements.define('homeos-delivery-card', HomeOSDeliveryCard);
