# MCP Knowledge Retrieval Platform

## Overview

This project provides a framework for collecting, normalizing, indexing, and retrieving organizational knowledge from multiple source systems.

Content is transformed into a common document model, indexed for semantic search, and exposed through a Model Context Protocol (MCP) server for consumption by tools and applications.

The platform is designed to support knowledge discovery across research administration, project management, governance, and collaborative workflows.

---

## Architecture

```text
Source Systems
    ↓
Content Collection
    ↓
Normalized Documents
    ↓
Chunking
    ↓
Embedding Generation
    ↓
Vector Index
    ↓
MCP Server
    ↓
Client Applications
```

---

## Source Systems

Content may be collected from a variety of sources, including:

- Zoom
- GitHub
- Confluence
- YouTube

The architecture is designed to support additional content sources over time.

---

## Normalized Document Model

All source content is transformed into a common structure before indexing.

Example:

```json
{
  "id": "",
  "project": "",
  "organizational_unit": [],
  "date": "",
  "source_system": "",
  "asset_type": "",
  "content_type": "",
  "title": "",
  "identifier": "",
  "identifier_type": "SAID",
  "source_url": "",
  "content": "",
  "collected_at": ""
}
```

### Field Definitions

| Field | Description |
|---------|-------------|
| id | Unique document identifier |
| project | Associated project or initiative |
| organizational_unit | Associated organizational groups |
| date | Source content date |
| source_system | Origin system |
| asset_type | Type of asset being represented |
| content_type | Type of content extracted |
| title | Human-readable title |
| identifier | Persistent identifier |
| identifier_type | Identifier scheme |
| source_url | Original source location |
| content | Text content used for indexing |
| collected_at | Collection timestamp |

---

## Content Types

Examples of supported content include:

- Transcript
- Closed Captioning
- Chat
- AI Summary
- Discussion Notes

Additional content types may be incorporated as requirements evolve.

---

## Repository Structure

### `mcp_data_generation`

Responsible for collecting and normalizing content from source systems.

Functions include:

- Content acquisition
- Metadata extraction
- Content normalization
- JSON document generation
- Identifier assignment

Outputs:

```text
Normalized JSON Documents
```

---

### `mcp_embeddings`

Responsible for preparing content for semantic search.

Functions include:

- Document chunking
- Embedding generation
- Index construction
- Search optimization

Outputs:

```text
Chunks
Embeddings
Vector Index
```

---

### `toip-mcp-server`

Provides access to indexed content through MCP.

Current capabilities include:

```text
search()
list_documents()
```

Responsibilities:

- Query processing
- Embedding-based retrieval
- Metadata filtering
- Result ranking
- MCP tool exposure

---

### `mcp_testing`

A lightweight client used to evaluate and test MCP functionality.

Typical activities include:

- Connecting to MCP servers
- Executing tool calls
- Inspecting responses
- Verifying retrieval behavior
- Testing metadata filters
- Evaluating search quality

Example workflow:

```text
list_documents()
    ↓
JSON Results
```

```text
search("registry governance")
    ↓
Ranked Search Results
```

---

## Data Processing Pipeline

### Document Preparation

```text
Source Content
    ↓
Normalization
    ↓
JSON Documents
```

### Index Construction

```text
JSON Documents
    ↓
Chunking
    ↓
Embeddings
    ↓
Vector Index
```

### Retrieval

```text
Query
    ↓
Embedding
    ↓
Vector Search
    ↓
Ranked Results
```

---

## Development Environment

The platform is intended to support local development and testing.

A typical local deployment consists of:

```text
Source Systems
    ↓
Document Generation
    ↓
Embedding Pipeline
    ↓
Vector Index
    ↓
MCP Server
    ↓
Client Applications
```

This architecture enables development, experimentation, and evaluation without requiring external infrastructure.

---

## Objectives

The project aims to:

- Create a reusable content ingestion framework.
- Establish a consistent document model across sources.
- Enable semantic retrieval across organizational knowledge.
- Expose retrieval capabilities through MCP.
- Support experimentation with knowledge discovery workflows.
- Provide a foundation for future applications and integrations.

---

## Future Enhancements

Potential areas of future development include:

- Additional source connectors
- Persistent identifier integration
- Hybrid retrieval strategies
- Advanced metadata filtering
- Evaluation datasets and benchmarking
- Knowledge graph integration
- Additional MCP tools
- Centralized deployment options

---

## License

To be determined.