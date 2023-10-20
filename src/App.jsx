import { useState } from "react";
import "./App.css";

const initialFriendsData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    country: "USA",
    city: "New York",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    country: "Canada",
    city: "Toronto",
  },
  // Agrega otros amigos aquí...
];

const countriesData = [
  { id: 1, name: "USA" },
  { id: 2, name: "Canada" },
  // Agrega otros países aquí...
];

const citiesData = {
  USA: [
    { id: 1, name: "New York" },
    { id: 2, name: "Los Angeles" },
    // Otras ciudades de USA...
  ],
  Canada: [
    { id: 1, name: "Toronto" },
    { id: 2, name: "Vancouver" },
    // Otras ciudades de Canadá...
  ],
  // Agrega otras ciudades para otros países aquí...
};

const fields = [
  { name: "firstName", label: "First Name", type: "text" },
  { name: "lastName", label: "Last Name", type: "text" },
  { name: "country", label: "Country", type: "select", options: countriesData },
  { name: "city", label: "City", type: "select", options: citiesData },
];

function App() {
  const [friends, setFriends] = useState(initialFriendsData);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
  });

  const onSubmit = (friendId) => {
    setFriends((prevFriends) => {
      const updatedFriends = prevFriends.map((friend) => {
        if (friend.id === friendId) {
          return { ...friend, ...formData };
        }
        return friend;
      });
      return updatedFriends;
    });

    // Limpiar el formulario después de enviar
    setFormData({
      firstName: "",
      lastName: "",
      country: "",
      city: "",
    });
  };

  const addFriend = () => {
    const newFriend = {
      id: friends.length + 1,
      ...formData,
    };
    setFriends((prevFriends) => [...prevFriends, newFriend]);
  };

  const removeFriend = (friendId) => () => {
    setFriends((prevFriends) =>
      prevFriends.filter((friend) => friend.id !== friendId)
    );
  };

  const handleEditClick = (friend) => {
    setFormData({
      firstName: friend.firstName,
      lastName: friend.lastName,
      country: friend.country,
      city: friend.city,
    });
  };

  return (
    <>
      <div className="form">
        {friends.map((friend) => (
          <div key={friend.id}>
            {fields.map((field, index) => (
              <div key={index}>
                <label>
                  {field.label}:
                  {field.type === "select" && Array.isArray(field.options) && (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.name]: e.target.value,
                        })
                      }
                      className="custom-select"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  )}
                  {field.type === "text" && (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.name]: e.target.value,
                        })
                      }
                      placeholder={`Enter ${field.label}`}
                    />
                  )}
                </label>
              </div>
            ))}
            <button type="button" onClick={removeFriend(friend.id)}>
              Remove
            </button>
            <button
              type="button"
              onClick={() => onSubmit(friend.id)}
              className="custom-button"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => handleEditClick(friend)}
              className="custom-button"
            >
              Edit
            </button>
          </div>
        ))}
        <button type="button" onClick={addFriend} className="custom-button">
          Add Friend
        </button>
      </div>
    </>
  );
}

export default App;
