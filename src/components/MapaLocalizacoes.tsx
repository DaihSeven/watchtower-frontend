"use client";

import { useEffect, useRef, useState } from "react";
import { LocalizacaoComAvistamento } from "@/types/localizacao";
import { Map as LeafletMap, Marker } from "leaflet";

interface Props {
  localizacoes: LocalizacaoComAvistamento[];
  onMarkerClick: (localizacao: LocalizacaoComAvistamento) => void;
}

export default function MapaLocalizacoes({
  localizacoes,
  onMarkerClick,
}: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const [LRef, setLRef] = useState<typeof import("leaflet") | null>(null);

  useEffect(() => {
    const loadLeaflet = async () => {
      const L = await import("leaflet");
      setLRef(L);

      const existingLink = document.querySelector('link[href*="leaflet.css"]');
      if (!existingLink) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }
    };

    loadLeaflet();
  }, []);

  useEffect(() => {
    if (!LRef || mapInstanceRef.current || !mapRef.current) return;

    const map = LRef.map(mapRef.current).setView([-23.5505, -46.6333], 10);
    LRef.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapInstanceRef.current = map;
  }, [LRef]);

  const handlePopupOpen = (localizacao: LocalizacaoComAvistamento) => {
    const btn = document.querySelector(
      `.marker-details-btn[data-id="${localizacao.id}"]`
    );
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        onMarkerClick(localizacao);
      });
    }
  };

  useEffect(() => {
    if (!LRef || !mapInstanceRef.current) return;

    const map = mapInstanceRef.current;

    markersRef.current.forEach((marker) => map.removeLayer(marker));
    markersRef.current = [];

    const bounds = LRef.latLngBounds([]);

    const createMarker = (localizacao: LocalizacaoComAvistamento) => {
      const lat = parseFloat(localizacao.latitude.toString());
      const lng = parseFloat(localizacao.longitude.toString());
      if (isNaN(lat) || isNaN(lng)) return;

      const marker = LRef.marker([lat, lng]).addTo(map);

      let statusColor = "gray";
      let statusText = "Desconhecido";

      if (localizacao.avistamento) {
        if (localizacao.avistamento.confirmado) {
          statusColor = "green";
          statusText = "Confirmado";
        } else {
          statusColor = "orange";
          statusText = "Não confirmado";
        }
      }

      const popupContent = `
        <section>
          <strong>${localizacao.nome || "Local"}</strong><br>
          ${localizacao.descricao || "Sem descrição"}<br>
          ${
            localizacao.avistamento
              ? `<span style="color: ${statusColor}">Avistamento: ${statusText}</span><br>`
              : ""
          }
          ${
            localizacao.avistamento
              ? `Data: ${new Date(
                  localizacao.avistamento.dataAvistamento
                ).toLocaleDateString()}`
              : ""
          }
          <br>
          <button class="marker-details-btn" data-id="${
            localizacao.id
          }" style="color: #2563eb; text-decoration: underline; background: none; border: none; cursor: pointer;">Ver detalhes</button>
        </section>
      `;

      marker.bindPopup(popupContent);

      marker.on("popupopen", () => handlePopupOpen(localizacao));

      markersRef.current.push(marker);
      bounds.extend([lat, lng]);
    };

    localizacoes.forEach(createMarker);

    if (markersRef.current.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [LRef, localizacoes, onMarkerClick]);

  return (
    <section className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-indigo-700 mb-4">
        Mapa de Avistamentos
      </h2>
      <div ref={mapRef} id="map" className="w-full h-96 rounded-lg min-h-400" />
      <section className="mt-3 text-sm text-gray-500">
        <p>Clique nos marcadores para ver detalhes sobre cada localização.</p>
      </section>
    </section>
  );
}
