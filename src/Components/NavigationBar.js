import React, { Component } from 'react';
import SelectInput from './SelectInput';
import { GetSectors, GetRowsOnSector, GetSitsOnRow } from './Data'

class NavigationBar extends Component {
    constructor(props) {
        super(props);

        let sectorsList = GetSectors(),
        rowsList = GetRowsOnSector(sectorsList[0]),
        sitsList = GetSitsOnRow(sectorsList[0], rowsList[0]);

        this.state = { 
            sectors: sectorsList,
            rows: rowsList,
            sits: sitsList,
            selectedSector: ''
        }

        this.OnSectorSelected = this.OnSectorSelected.bind(this);
        this.OnRowSelected = this.OnRowSelected.bind(this);
    }

    OnSectorSelected(sector) {
        let rowsList = GetRowsOnSector(sector);
        let sitsList = GetSitsOnRow(sector, rowsList[0]);
        
        this.setState({
            selectedSector: sector,
            rows: rowsList,
            sits: sitsList
        })
    }

    OnRowSelected(row) {
        let sitsList = GetSitsOnRow(this.state.selectedSector, row);

        this.setState({
            sits: sitsList
        })
    }

    OnSeatSelected(seat) {

    }

    render() {
        return (
            <div>
                <legend>Сектор</legend>
                <SelectInput onSelected={this.OnSectorSelected} options={this.state.sectors} />

                <legend>Ряд</legend>
                <SelectInput onSelected={this.OnRowSelected} options={this.state.rows} />

                <legend>Место</legend>
                <SelectInput onSelected={this.OnSeatSelected} options={this.state.sits} />
            </div>
        );
    }
}

export default NavigationBar;