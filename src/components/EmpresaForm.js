// EmpresaForm.js
import React, { useState, useEffect } from 'react';

const EmpresaForm = () => {
  const [paises, setPaises] = useState([]);
  const [selectedPais, setSelectedPais] = useState('');
  const [regionesVinicolas, setRegionesVinicolas] = useState([]);
  const [isPaisSelected, setIsPaisSelected] = useState(false);

  // Nuevos estados para los datos del formulario
  const [formData, setFormData] = useState({
    idPais: '',
    idRegion: '',
    nombre: '',
    fechaFundacion: '',
    direccion: '',
    descripcion: '',
    telefono: '',
    paginaWeb: '',
    descripcionVinos: '',
  });

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await fetch('http://localhost:4000/paises_productores');
        const data = await response.json();
        setPaises(data);
      } catch (error) {
        console.error('Error fetching paises:', error);
      }
    };

    fetchPaises();
  }, []);

  useEffect(() => {
    const fetchRegionesVinicolas = async () => {
      try {
        const response = await fetch(`http://localhost:4000/region_vinicola_do/${selectedPais.id}`);
        const data = await response.json();
        setRegionesVinicolas([data]);
      } catch (error) {
        console.error('Error fetching regiones vinicolas:', error);
      }
    };

    if (isPaisSelected) {
      fetchRegionesVinicolas();
    }
  }, [selectedPais, isPaisSelected]);

  const handlePaisChange = async (e) => {
    const selectedPaisObject = paises.find((pais) => pais.nombre === e.target.value);
    console.log('Pais Productor seleccionado:', selectedPaisObject);
  
    setSelectedPais(selectedPaisObject);
    setIsPaisSelected(true);
  
    try {
      const response = await fetch(`http://localhost:4000/region_vinicola_do/${selectedPaisObject.id}`);
      const data = await response.json();
      setRegionesVinicolas([data]);
  
      // Actualizar los IDs en el estado del formulario
      setFormData({
        ...formData,
        idPais: selectedPaisObject.id,
        idRegion: data.id, // Actualizar idRegion con el ID de la región seleccionada
      });
    } catch (error) {
      console.error('Error fetching regiones vinicolas:', error);
    }
  };

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Realizar la solicitud POST al backend con los datos del formulario
      const response = await fetch('http://localhost:4000/empresas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_pais_productor: formData.idPais,
          id_region_vinicola_do: formData.idRegion,
          nombre: formData.nombre,
          fecha_fundacion: formData.fechaFundacion,
          direccion: formData.direccion,
          descripcion_bodega: formData.descripcion,
          telefono: formData.telefono,
          pagina_web: formData.paginaWeb,
          descripcion_vinos: formData.descripcionVinos,
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Empresa creada:', result);
        // Aquí puedes realizar cualquier acción adicional después de crear la empresa, si es necesario.
      } else {
        console.error('Error al crear la empresa:', response.status, response.statusText);
        // Aquí puedes manejar el error de alguna manera, como mostrar un mensaje al usuario.
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      // Aquí puedes manejar errores de red u otros errores inesperados.
    }
  };
  
  return (
    <div className="m-4 p-4 bg-gray-200 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Formulario</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">País Productor</label>
          <select
            className="w-full p-2 border rounded"
            value={selectedPais.nombre}
            onChange={handlePaisChange}
          >
            <option value="" disabled>
              Selecciona un país
            </option>
            {paises.map((pais) => (
              <option key={pais.id} value={pais.nombre}>
                {pais.nombre}
              </option>
            ))}
          </select>
        </div>

        {isPaisSelected && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Región Vinícola</label>
              <select
                className="w-full p-2 border rounded"
                name="idRegion"
                value={formData.idRegion}
                onChange={handleChange}
              >
                {regionesVinicolas.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Nuevos campos con funciones de manejo de cambios */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Nombre</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Fecha de Fundación</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                name="fechaFundacion"
                value={formData.fechaFundacion}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Dirección</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Descripción</label>
              <textarea
                className="w-full p-2 border rounded"
                rows="4"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Teléfono</label>
              <input
                type="tel"
                className="w-full p-2 border rounded"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Página Web</label>
              <input
                type="url"
                className="w-full p-2 border rounded"
                name="paginaWeb"
                value={formData.paginaWeb}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Descripción de Vinos</label>
              <textarea
                className="w-full p-2 border rounded"
                rows="4"
                name="descripcionVinos"
                value={formData.descripcionVinos}
                onChange={handleChange}
              ></textarea>
            </div>
          </>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default EmpresaForm;
