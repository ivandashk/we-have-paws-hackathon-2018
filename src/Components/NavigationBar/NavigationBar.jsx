import React, { Component } from 'react';
import SelectInput from '../SelectInput';
import { GetSectors, GetRowsOnSector, GetSitsOnRow } from '../Data'
import './NavigationBar.css'

class NavigationBar extends Component {
    constructor(props) {
        super(props);
        
        let sectorsList = GetSectors(),
        rowsList = GetRowsOnSector(sectorsList[0]),
        seatsList = GetSitsOnRow(sectorsList[0], rowsList[0]);

        this.state = { 
            sectors: sectorsList,
            rows: rowsList,
            seats: seatsList,
            selectedSector: ''
        }

        this.OnSectorSelected = this.OnSectorSelected.bind(this);
        this.OnRowSelected = this.OnRowSelected.bind(this);
    }

    OnSectorSelected(sector) {
        let rowsList = GetRowsOnSector(sector);
        let seatsList = GetSitsOnRow(sector, rowsList[0]);
        
        this.setState({
            selectedSector: sector,
            rows: rowsList,
            seats: seatsList
        })
    }

    OnRowSelected(row) {
        let seatsList = GetSitsOnRow(this.state.selectedSector, row);

        this.setState({
            seats: seatsList
        })
    }

    OnSeatSelected(seat) {
    }

    render() {
        return (
            <div>
                <SelectInput name="Сектор" onSelected={this.OnSectorSelected} options={this.state.sectors} />
                <SelectInput name="Ряд" onSelected={this.OnRowSelected} options={this.state.rows} />
                <SelectInput name="Место" onSelected={this.OnSeatSelected} options={this.state.seats} />
            </div>
        );
    }
}

export default NavigationBar;