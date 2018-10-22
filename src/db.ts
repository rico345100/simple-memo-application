import { createConnection, Connection } from "typeorm";
import { EventEmitter } from 'events';
import { filter } from "async";
import { NullableConnection } from './types';

const Events = {
    Connected: 'onconnected',
    Disconnected: 'ondisconnected'
};

let eventManager:EventEmitter = new EventEmitter();
let m_Connection:NullableConnection = null;

(async function() {
    try {
        m_Connection = await createConnection();
        eventManager.emit(Events.Connected, m_Connection);
    }
    catch(err) {
        throw err;
    }
})();


/**
 * IDBDisconnectOptions
 * @param {boolean} force - If it sets true, forcely disconnect from DB.
 */
interface IDBDisconnectOptions {
    force?: boolean;
}

/**
 * Disconnect from Database
 * @param {IDBDisconnectOptions} options - Options
 */
async function disconnect(options?:IDBDisconnectOptions):Promise<any|Error> {
    if(m_Connection == null) return Promise.resolve();

    let eventInvoked = false;

    try {
        await m_Connection.close();

        eventManager.emit(Events.Disconnected);
        m_Connection = null;

        eventInvoked = true;
    }
    catch(err) {
        throw err;
    }
    finally {
        let filteredOption:IDBDisconnectOptions = typeof options === 'undefined' ? {} : options;

        if(filteredOption.force && !eventInvoked) {
            eventManager.emit(Events.Disconnected);
        }
    }
}

export default {
    // Properties
    Events,
    // Getter
    get connection():NullableConnection {
        return m_Connection;
    },
    // Functions
    disconnect,
    eventManager,
};