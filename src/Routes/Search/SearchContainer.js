import React from "react";
import { moviesApi, tvApi } from "../../api";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
  state = {
    moiveResults: null,
    tvResults: null,
    searchTerm: "",
    error: null,
    loading: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchingByTerm(searchTerm);
    }
  };

  updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    this.setState({
      searchTerm: value,
    });
  };

  searchingByTerm = async (term) => {
    try {
      const {
        data: { results: moiveResults },
      } = await moviesApi.search(term);
      const {
        data: { results: tvResults },
      } = await tvApi.search(term);
      this.setState({
        moiveResults,
        tvResults,
      });
    } catch {
      this.setState({ error: "Can't find searching results" });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { moiveResults, tvResults, searchTerm, error, loading } = this.state;
    return (
      <SearchPresenter
        moiveResults={moiveResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        error={error}
        loading={loading}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    );
  }
}
