import React, { Component } from 'react'
import XLSX from 'xlsx'

class Sheet extends Component {
  constructor() {
    super()
    this.state = {
      data: [
        {
          "name": "Slamet",
          "email": "slamet@gmail.com",
          "address": "Blok A",
          "phone": "Pinjem"
        },
        {
          "name": "Sugeng",
          "email": "sugeng@gmail.com",
          "address": "Blok B",
          "phone": "Bekas"
        },
        {
          "name": "Bejo",
          "email": "bejo@gmail.com",
          "address": "Blok C",
          "phone": "Bajak"
        },
        {
          "name": "Nuryanto",
          "email": "nuryanto@gmail.com",
          "address": "Blok D",
          "phone": "Pinjem"
        },
        {
          "name": "Edi",
          "email": "edi@gmail.com",
          "address": "Blok E",
          "phone": "Sewa"
        },
      ]
    }
    this.exportFile = this.exportFile.bind(this)
  }
  exportFile() {
    let header = [["Nama", "Email", "Alamat", "Telp"]]
    const ws = XLSX.utils.aoa_to_sheet(header);
    XLSX.utils.sheet_add_json(ws, this.state.data, {
      header: ["name", "email", "address", "phone"],
      skipHeader: true,
      origin: -1
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Profile");
    XLSX.writeFile(wb, "profile.xlsx")
  };

  render() {
    return (
      <>
        <table>
          <thead>
            <tr>
              <td>Nama</td>
              <td>Email</td>
              <td>Alamat</td>
              <td>Telp</td>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(val => {
              return <tr key={val.email}>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.address}</td>
                <td>{val.phone}</td>
              </tr>
            })}
          </tbody>
        </table>
        <p></p>
        <button onClick={this.exportFile}>Export</button>
      </>
    )
  }
}

export default Sheet
