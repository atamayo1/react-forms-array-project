import { useState } from "react";
import "./App.css";

const initialFriendsData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    country: "USA",
    city: "New York"
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    country: "Canada",
    city: "Toronto"
  }
  // Agrega otros amigos aquí...
];

const countriesData = [
  { id: 1, name: "USA" },
  { id: 2, name: "Canada" }
  // Agrega otros países aquí...
];

const citiesData = {
  1: [
    { id: 1, name: "New York" },
    { id: 2, name: "Los Angeles" }
    // Otras ciudades de USA...
  ],
  2: [
    { id: 1, name: "Toronto" },
    { id: 2, name: "Vancouver" }
    // Otras ciudades de Canadá...
  ]
  // Agrega otras ciudades para otros países aquí...
};

function App() {
  const [friends, setFriends] = useState(initialFriendsData);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: ""
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
      city: ""
    });
  };

  const addFriend = () => {
    const newFriend = {
      id: friends.length + 1,
      ...formData
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
      city: friend.city
    });
  };

  return (
    <>
      <div className="form">
        {friends.map((friend) => {
          const fieldName = `friends[${friend.id}]`;
          return (
            <div key={friend.id}>
              <label>
                First Name:
                <input
                  type="text"
                  name={`${fieldName}.firstName`}
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="First Name"
                />
              </label>

              <label>
                Last Name:
                <input
                  type="text"
                  name={`${fieldName}.lastName`}
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Last Name"
                />
              </label>

              <label>
                Country:
                <select
                  name={`${fieldName}.country`}
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  className="custom-select"
                >
                  <option value="">Select Country</option>
                  {countriesData.map((country) => (
                    <option key={country.id} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </label>

              {formData.country && (
                <label>
                  City:
                  <select
                    name={`${fieldName}.city`}
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="custom-select"
                  >
                    <option value="">Select City</option>
                    {citiesData[formData.country].map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </label>
        )}

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
          );
        })}
        <button type="button" onClick={addFriend} className="custom-button">
          Add Friend
        </button>
      </div>
    </>
  );
}

export default App;
