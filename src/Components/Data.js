import DataMap from '../Data/Map.json';

// GetSectors, GetRows, GetSits

function GetSectors() {
    // TODO: Make as promise

    let sectors = [];

    DataMap.sectors.forEach(item => {
        sectors.push(item.index);
    })

    return sectors;
}

function GetRowsOnSector(sector) {
    // TODO: Make as promise

    let sectorData = DataMap.sectors.filter(item => {
        return item.index == sector;
    });

    let rows = [];

    sectorData[0].rows.forEach(item => {
        rows.push(item.index);
    });
    
    return rows;
}

function GetSeatsOnRow(sector, row) {
    // TODO: Make as promise

    let sectorData = DataMap.sectors.filter(item => {
        return item.index == sector;
    });

    let rowData = sectorData[0].rows.filter(item => {
        return item.index == row;
    });

    let seats = [];

    rowData[0].sits.forEach(item => {
        seats.push(item.index);
    });

    return seats;
}

export {
    GetSectors,
    GetRowsOnSector,
    GetSeatsOnRow
};