"use client";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

type Contract = {
  agency: string;
  vendor: string;
  contract_title: string;
  amount: number;
  year: number;
  state: string;
};

type Props = {
  contracts: Contract[];
};

const stateCoordinates: Record<
  string,
  [number, number]
> = {
  California: [36.7783, -119.4179],
  Texas: [31.9686, -99.9018],
  Florida: [27.6648, -81.5158],
  NewYork: [42.9134, -75.5963],
  Illinois: [40.6331, -89.3985],
  Georgia: [32.1574, -82.9071],
  Washington: [47.7511, -120.7401],
  Colorado: [39.5501, -105.7821],
};

export default function MapView({
  contracts,
}: Props) {
  return (
    <MapContainer
      center={[39.5, -98.35]}
      zoom={4}
      style={{
        width: "100%",
        height: "600px",
        borderRadius: 12,
      }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {contracts.map((contract, index) => {
        const position =
          stateCoordinates[contract.state];

        if (!position) return null;

        return (
          <CircleMarker
            key={index}
            center={position}
            radius={8}
            pathOptions={{
              color: "#38bdf8",
              fillColor: "#22c55e",
              fillOpacity: 0.8,
            }}
          >
            <Popup>
              <strong>{contract.contract_title}</strong>

              <br />
              <br />

              Agency:
              <br />
              {contract.agency}

              <br />
              <br />

              Vendor:
              <br />
              {contract.vendor}

              <br />
              <br />

              Amount:
              <br />$
              {contract.amount.toLocaleString()}
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}