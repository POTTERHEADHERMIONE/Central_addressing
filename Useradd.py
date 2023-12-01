
from database import addUser
addUser("john.doe@example.com", "passJohnDoe", "John Doe", {"RANAC": "101", "ES": "102", "CNA": "103", "OOP": "201"})
addUser("jane.smith@example.com", "passJaneSmith", "Jane Smith", {"RANAC": "101", "ES": "102", "CNA": "103", "OOP": "201"})
addUser("alex.jones@example.com", "passAlexJones", "Alex Jones", {"RANAC": "101", "ES": "102", "CNA": "103", "OOP": "201"})
addUser("emma.white@example.com", "passEmmaWhite", "Emma White", {"RANAC": "101", "ES": "102", "CNA": "103", "OOP": "201"})
addUser("michael.brown@example.com", "passMichaelBrown", "Michael Brown", {"RANAC": "101", "ES": "102", "CNA": "103", "OOP": "201"})
addUser("olivia.davis@example.com", "passOliviaDavis", "Olivia Davis", {"RANAC": "101", "ES": "102", "CNA": "103", "OOP": "201"})
addUser("ryan.wilson@example.com", "passRyanWilson", "Ryan Wilson", {"RANAC": "101", "ES": "102", "CNA": "103", "OOP": "201"})
addUser("sophia.garcia@example.com", "passSophiaGarcia", "Sophia Garcia", {"RANAC": "101", "ES": "102", "CNA": "103", "OOP": "201"})
addUser("daniel.martin@example.com", "passDanielMartin", "Daniel Martin", {"RANAC": "101", "ES": "102", "CNA": "103", "OOP": "201"})
addUser("emily.taylor@example.com", "passEmilyTaylor", "Emily Taylor", {"RANAC": "101", "ES": "102", "CNA": "103", "OOP": "201"})

#adding the admins
addUser("alice.smith@example.com", "passAliceSmith", "Alice Smith", {"sub": "RANAC", "rooms": ["103", "105", "106"]}, 0)
addUser("bob.jones@example.com", "passBobJones", "Bob Jones", {"sub": "OOP", "rooms": ["103", "105", "106"]}, 0)
addUser("carol.white@example.com", "passCarolWhite", "Carol White", {"sub": "ES", "rooms": ["103", "105", "106"]}, 0)
addUser("david.brown@example.com", "passDavidBrown", "David Brown", {"sub": "OOP", "rooms": ["103", "105", "106"]}, 0)
addUser("eva.davis@example.com", "passEvaDavis", "Eva Davis", {"sub": "ES", "rooms": ["103", "105", "106"]}, 0)
addUser("frank.wilson@example.com", "passFrankWilson", "Frank Wilson", {"sub": "RANAC", "rooms": ["103", "105", "106"]}, 0)
addUser("grace.garcia@example.com", "passGraceGarcia", "Grace Garcia", {"sub": "OOP", "rooms": ["103", "105", "106"]}, 0)
addUser("hank.martin@example.com", "passHankMartin", "Hank Martin", {"sub": "RANAC", "rooms": ["103", "105", "106"]}, 0)
addUser("ivy.taylor@example.com", "passIvyTaylor", "Ivy Taylor", {"sub": "ES", "rooms": ["103", "105", "106"]}, 0)
addUser("jack.doe@example.com", "passJackDoe", "Jack Doe", {"sub": "OOP", "rooms": ["103", "105", "106"]}, 0)