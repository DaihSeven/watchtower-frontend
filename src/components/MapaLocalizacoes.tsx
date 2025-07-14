"use client";

import { useEffect, useRef } from 'react';
import { LocalizacaoComAvistamento } from '@/types/localizacao';

interface Props {
  localizacoes: LocalizacaoComAvistamento[];
  onMarkerClick: (localizacao: LocalizacaoComAvistamento) => void;
}

declare global {
  interface Window {
    L: any;
  }
}

export default function MapaLocalizacoes({ localizacoes, onMarkerClick }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    // Carregar Leaflet dinamicamente
    const loadLeaflet = async () => {
      if (typeof window !== 'undefined' && !window.L) {
        const L = await import('leaflet');
        window.L = L.default;
        
        // Carregar CSS do Leaflet
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }
    };

    loadLeaflet().then(() => {
      if (mapRef.current && window.L && !mapInstanceRef.current) {
        // Inicializar mapa
        const map = window.L.map(mapRef.current).setView([-23.5505, -46.6333], 10);
        mapInstanceRef.current = map;

        // Adicionar tile layer
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
      }
    });
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !window.L) return;

    const map = mapInstanceRef.current;
    
    // Limpar marcadores existentes
    markersRef.current.forEach(marker => map.removeLayer(marker));
    markersRef.current = [];

    const bounds = window.L.latLngBounds();

    localizacoes.forEach(localizacao => {
      if (localizacao.latitude && localizacao.longitude) {
        const lat = parseFloat(localizacao.latitude.toString());
        const lng = parseFloat(localizacao.longitude.toString());

        if (!isNaN(lat) && !isNaN(lng)) {
          const marker = window.L.marker([lat, lng]).addTo(map);
          
          // Determinar cor do marcador baseado no status
          let statusColor = 'gray';
          let statusText = 'Desconhecido';
          
          if (localizacao.avistamento) {
            if (localizacao.avistamento.confirmado) {
              statusColor = 'green';
              statusText = 'Confirmado';
            } else {
              statusColor = 'yellow';
              statusText = 'Não confirmado';
            }
          }

          // Popup com informações
          const popupContent = `
            <div>
              <strong>${localizacao.nome || 'Local'}</strong><br>
              ${localizacao.descricao || 'Sem descrição'}<br>
              ${localizacao.avistamento ? `<span style="color: ${statusColor === 'green' ? '#059669' : '#D97706'}">Avistamento: ${statusText}</span><br>` : ''}
              ${localizacao.avistamento ? `Data: ${new Date(localizacao.avistamento.dataAvistamento).toLocaleDateString()}` : ''}
              <br><button class="marker-details-btn" data-id="${localizacao.id}" style="color: #2563eb; text-decoration: underline; background: none; border: none; cursor: pointer;">Ver detalhes</button>
            </div>
          `;

          marker.bindPopup(popupContent);

          // Adicionar evento ao botão de detalhes no popup
          marker.on('popupopen', () => {
            const btn = document.querySelector(`.marker-details-btn[data-id="${localizacao.id}"]`);
            if (btn) {
              btn.addEventListener('click', (e) => {
                e.preventDefault();
                onMarkerClick(localizacao);
              });
            }
          });

          markersRef.current.push(marker);
          bounds.extend([lat, lng]);
        }
      }
    });

    // Ajustar zoom para mostrar todos os marcadores
    if (markersRef.current.length > 0) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [localizacoes, onMarkerClick]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-indigo-700 mb-4">Mapa de Avistamentos</h2>
      <div 
        ref={mapRef} 
        id="map" 
        className="w-full h-96 rounded-lg"
        style={{ minHeight: '400px' }}
      />
      <div className="mt-3 text-sm text-gray-500">
        <p>Clique nos marcadores para ver detalhes sobre cada localização.</p>
      </div>
    </div>
  );
} 