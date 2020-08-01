import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Spin } from "antd";

// UI Components
import { PageHeader } from "@components/CommonStyles";
import { Button, Input } from "antd";

const Search = Input.Search;

class CustomListHeader extends Component {
  state = {
    title: typeof this.props.header === "object" && this.props.header.title,
    subtitle:
      typeof this.props.header === "object" && this.props.header.subtitle,
  };

  async componentDidMount() {
    const { header, id } = this.props;
    if (!!header && typeof header !== "object") {
      const { title, subtitle } = await header(id);
      this.setState({ title, subtitle });
    }
  }

  render() {
    const { title, subtitle } = this.state;
    return (
      <div style={{ minheight: "80px" }}>
        <Spin spinning={!this.state.title}>
          <h3>{title}</h3>
          {subtitle ? (
            typeof subtitle === "string" ? (
              <div>{subtitle}</div>
            ) : (
              subtitle.map((s) => <div key={s}>{s}</div>)
            )
          ) : (
            ``
          )}
        </Spin>
      </div>
    );
  }
}

const ListHeader = ({
  id,
  header,
  entityLabel,
  hideSearchBar,
  handleSearch,
  addButtonProps,
  permission,
  searching,
}) => {
  const { pathname, state, ...buttonProps } = addButtonProps || {};

  // HACK: remove when done with access HOC
  // const isAddCompanyButton = accessLevel === "COMPANY" && permission === "OVERVIEW_LIST"
  return (
    <PageHeader>
      <CustomListHeader header={header} id={id} />

      <div className="gap-between" />
      {!hideSearchBar ? (
        <Search
          onChange={({ target }) => {
            if (target.value === "") handleSearch("");
          }}
          placeholder={`Search by ${entityLabel}`}
          onSearch={(value) => {
            if (value.length > 2 || entityLabel === "Parking Lot")
              if (!searching) handleSearch(value);
          }}
        />
      ) : (
        <div />
      )}
      {/*<div />*/}

      {pathname && (
        <Link to={{ pathname, state }}>
          <Button
            {...buttonProps}
            type="primary"
            icon="plus"
          >{`Add ${entityLabel}`}</Button>
        </Link>
      )}
    </PageHeader>
  );
};

export default ListHeader;
