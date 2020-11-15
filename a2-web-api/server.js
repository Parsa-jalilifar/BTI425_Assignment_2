/**********************************************************************************
 * Web service setup - Packages for handling data and requests.                   *
 **********************************************************************************/
const express = require("express");
const path = require("path");
var cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

const manager = require("./manager.js"); //MongoDB Data model and API request handling.

app.use(bodyParser.json()); // Add support for incoming JSON entities.
app.use(cors()); // Add support for CORS.
app.use(bodyParser.urlencoded({ extended: true }));

/**********************************************************************************
 * Deliver the app's home page to browser clients                                 *
 **********************************************************************************/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

/**********************************************************************************
 * Resources available in this web API                                            *
 **********************************************************************************/
app.get("/api", (req, res) => {
  const links = [];

  links.push({
    rel: "collection",
    href: "/api/termsEng",
    methods: "GET,POST",
  });
  links.push({
    rel: "collection",
    href: "/api/termsEng/search/:key",
    methods: "GET",
  });
  links.push({
    rel: "collection",
    href: "/api/termsEng/:id",
    methods: "GET",
  });
  links.push({
    rel: "collection",
    href: "/api/termsEng/wordEng/:word",
    methods: "GET",
  });
  links.push({
    rel: "collection",
    href: "/api/termsEng/def/:id",
    methods: "PUT",
  });
  links.push({
    rel: "collection",
    href: "/api/termsEng/helpYes",
    methods: "PUT",
  });
  links.push({
    rel: "collection",
    href: "/api/termsEng/helpNo",
    methods: "PUT",
  });
  links.push({
    rel: "collection",
    href: "/api/termsNonEng/like/:id",
    methods: "PUT",
  });
  links.push({
    rel: "collection",
    href: "/api/termsNonEng",
    methods: "GET,POST",
  });
  links.push({
    rel: "collection",
    href: "/api/termsNonEng/termEngId/:id",
    methods: "GET",
  });
  links.push({
    rel: "collection",
    href: "/api/termsNonEng/:id",
    methods: "GET",
  });
  links.push({
    rel: "collection",
    href: "/api/termsNonEng/wordNon/:word",
    methods: "GET",
  });
  links.push({
    rel: "collection",
    href: "/api/termsNonEng/def/:id",
    methods: "PUT",
  });
  links.push({
    rel: "collection",
    href: "/api/termsNonEng/helpYes",
    methods: "PUT",
  });
  links.push({
    rel: "collection",
    href: "/api/termsNonEng/helpNo",
    methods: "PUT",
  });
  links.push({
    rel: "collection",
    href: "/api/termsNonEng/like/:id",
    methods: "PUT",
  });

  const linkObject = {
    apiName: "Web API for Assignment 2",
    apiVersion: "1.0",
    apiDescription: "Dictionary data for technical terms",
    apiAuthor: "Parsa Jalilifar",
    links: links,
  };
  res.json(linkObject);
});

// *************************************************************************** //
// ****************************** ENGLISH TERMS ****************************** //
// *************************************************************************** //

// Get all
app.get("/api/termsEng", (req, res) => {
  manager
    .termEngGetAll()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});

// Search
app.get("/api/termsEng/search/:key", (req, res) => {
  manager
    .termEngSearch(req.params.key)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});

// Get one by Id
app.get("/api/termsEng/:id", (req, res) => {
  manager
    .termEngGetById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});

// Get one By Word
app.get("/api/termsEng/wordEng/:word", (req, res) => {
  manager
    .termEngGetByWord(req.params.word)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ message: "Resource not found" });
    });
});

// Add a new
app.post("/api/termsEng", (req, res) => {
  manager
    .termEngAdd(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});

// Add definition
app.put("/api/termsEng/def/:id", (req, res) => {
  manager
    .termEngEditAddDef(req.params.id, req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ message: "Resource not found" });
    });
});

// Increment 'yes'
app.put("/api/termsEng/helpYes", (req, res) => {
  manager
    .termEngHelpYes(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ message: "Resource not found" });
    });
});

// Increment 'no'
app.put("/api/termsEng/helpNo", (req, res) => {
  manager
    .termEngHelpNo(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ message: "Resource not found" });
    });
});

// Increment document 'like'
app.put("/api/termsEng/like/:id", (req, res) => {
  manager
    .termEngLikes(req.params.id, req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ message: "Resource not found" });
    });
});

// ******************************************************************************* //
// ****************************** NON-ENGLISH TERMS ****************************** //
// ******************************************************************************* //

// Get all
app.get("/api/termsNonEng", (req, res) => {
  manager
    .termNonGetAll()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});

// Get all by English term id
app.get("/api/termsNonEng/termEngId/:id", (req, res) => {
  manager
    .termNonGetAllByEngId(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});

// Get By ID
app.get("/api/termsNonEng/:id", (req, res) => {
  manager
    .termNonGetById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ message: "Resource not found" });
    });
});

// Get By Word
app.get("/api/termsNonEng/wordNon/:word", (req, res) => {
  manager
    .termNonGetByWord(req.params.word)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ message: "Resource not found" });
    });
});

// Add new
app.post("/api/termsNonEng", (req, res) => {
  manager
    .termNonAdd(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ message: error });
    });
});

// Add definition
app.put("/api/termsNonEng/def/:id", (req, res) => {
  manager
    .termNonEditAddDef(req.params.id, req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ message: "Resource not found" });
    });
});

// Increment 'yes'
app.put("/api/termsNonEng/helpYes", (req, res) => {
  manager
    .termNonHelpYes(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ message: "Resource not found" });
    });
});

// Increment 'no'
app.put("/api/termsNonEng/helpNo", (req, res) => {
  manager
    .termNonHelpNo(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ message: "Resource not found" });
    });
});

// Increment document 'like'
app.put("/api/termsNonEng/like/:id", (req, res) => {
  manager
    .termNonLikes(req.params.id, req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ message: "Resource not found" });
    });
});

// ################################################################################
// Resource not found (this should be at the end)
app.use((req, res) => {
  res.status(404).send("Resource not found");
});

// Attempt to connect to the database, and tell the app to start listening for requests
manager
  .initialize()
  .then(
    app.listen(
      HTTP_PORT,
      console.log(`Ready to handle requests on port: ${HTTP_PORT}`)
    )
  )
  .catch((err) => {
    console.log("Unable to start the server:\n" + err);
    process.exit();
  });
