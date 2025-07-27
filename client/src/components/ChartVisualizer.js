import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import * as THREE from 'three';

function ChartVisualizer({ data }) {
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartType, setChartType] = useState('2d');
  const chartRef = useRef(null);
  const threeRef = useRef(null);
  const chartInstance = useRef(null);
  const threeScene = useRef(null);

  const columns = data.length ? Object.keys(data[0]) : [];

  // Clean up function to remove existing charts
  const clearChart = () => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }
    if (threeScene.current) {
      // Remove canvas for Three.js scene
      if (threeRef.current) {
        while (threeRef.current.firstChild) {
          threeRef.current.removeChild(threeRef.current.firstChild);
        }
      }

      // Dispose Three.js objects
      if (threeScene.current.renderer) {
        threeScene.current.renderer.dispose();
      }
      threeScene.current = null;
    }
  };

  // Create 2D Chart.js chart
  const render2DChart = () => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => d[xAxis]),
        datasets: [
          {
            label: `${yAxis} vs ${xAxis}`,
            data: data.map(d => d[yAxis]),
            borderColor: 'rgba(37, 99, 235, 1)', // Tailwind blue-600
            backgroundColor: 'rgba(37, 99, 235, 0.2)',
            fill: true,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: { display: true },
          tooltip: { enabled: true },
        },
        scales: {
          x: { title: { display: true, text: xAxis } },
          y: { title: { display: true, text: yAxis } },
        },
      },
    });
  };

  // Create basic 3D scatter plot with Three.js
  const render3DChart = () => {
    if (!threeRef.current) return;

    const mount = threeRef.current;
    const width = mount.clientWidth || 600;
    const height = mount.clientHeight || 400;

    // Scene & camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf9fafb); // Tailwind gray-50
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 50;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // Add points as spheres
    data.forEach(point => {
      const x = parseFloat(point[xAxis]);
      const y = parseFloat(point[yAxis]);
      if (isNaN(x) || isNaN(y)) return;

      const geometry = new THREE.SphereGeometry(0.5, 8, 8);
      const material = new THREE.MeshStandardMaterial({ color: 0x2563eb }); // Tailwind blue-600
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(x, y, 0);
      scene.add(sphere);
    });

    // Add light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    scene.add(light);

    // Animate loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Save for cleanup
    threeScene.current = { scene, camera, renderer };
  };

  // Effect to rerender charts on input change
  useEffect(() => {
    clearChart();
    if (xAxis && yAxis) {
      if (chartType === '2d') {
        render2DChart();
      } else if (chartType === '3d') {
        render3DChart();
      }
    }
    return () => clearChart();
  }, [xAxis, yAxis, chartType, data]);

  // Download PNG for 2D canvas
  const downloadPNG = () => {
    if (chartType === '2d' && chartRef.current) {
      const url = chartRef.current.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = 'chart.png';
      link.click();
    } else {
      alert('PNG download is supported only for 2D charts.');
    }
  };

  // Download PDF for 2D canvas using jsPDF
  const downloadPDF = () => {
    import('jspdf').then(jsPDFModule => {
      const jsPDF = jsPDFModule.default;
      const pdf = new jsPDF();
      if (chartType === '2d' && chartRef.current) {
        const imgData = chartRef.current.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 10, 10, 180, 100);
        pdf.save('chart.pdf');
      } else {
        alert('PDF download is supported only for 2D charts.');
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow rounded p-6">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Visualize Data</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        {/* X Axis selector */}
        <div>
          <label htmlFor="xAxis" className="block text-gray-700 font-medium mb-1">
            X Axis
          </label>
          <select
            id="xAxis"
            value={xAxis}
            onChange={e => setXAxis(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select column</option>
            {columns.map(col => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>

        {/* Y Axis selector */}
        <div>
          <label htmlFor="yAxis" className="block text-gray-700 font-medium mb-1">
            Y Axis
          </label>
          <select
            id="yAxis"
            value={yAxis}
            onChange={e => setYAxis(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select column</option>
            {columns.map(col => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>

        {/* Chart Type selector */}
        <div>
          <label htmlFor="chartType" className="block text-gray-700 font-medium mb-1">
            Chart Type
          </label>
          <select
            id="chartType"
            value={chartType}
            onChange={e => setChartType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="2d">2D (Chart.js)</option>
            <option value="3d">3D (Three.js)</option>
          </select>
        </div>
      </div>

      {/* Chart display */}
      {chartType === '2d' && (
        <canvas
          ref={chartRef}
          width="600"
          height="400"
          className="border border-gray-300 rounded shadow-sm mx-auto block"
        />
      )}

      {chartType === '3d' && (
        <div
          ref={threeRef}
          className="border border-gray-300 rounded shadow-sm mx-auto block"
          style={{ width: '600px', height: '400px' }}
        />
      )}

      {/* Download buttons */}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={downloadPNG}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Download PNG
        </button>
        <button
          onClick={downloadPDF}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default ChartVisualizer;