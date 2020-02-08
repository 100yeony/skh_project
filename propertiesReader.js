const PropertiesReader = require('properties-reader');

const properties = PropertiesReader('InstallConfig');

module.exports = {
  //user정보
  get_hostname(){
    return properties.get("server_hostname");
  },
  get_password(){
    return properties.get("server_password");
  },


  get_rpm_dir_origin(){
    return properties.get("rpm_dir_origin")
  },
  get_rpm_dir(){
    return properties.get("rpm_dir");
  },



  //cluster 정보
  get_server_IP(){
    return properties.get("server_IP");
  },
  get_nodes_IP(){
    return properties.get("nodes_IP");
  },
  get_nodes_hostname(){
    return properties.get("nodes_hostname");
  },
  get_nodes_password(){
    return properties.get("nodes_password");
  },

  //directory
  get_server_install_dir(){
    return properties.get("server_install_dir");
  },
  get_node_install_dir(){
    return properties.get("node_install_dir");
  },
  get_node_data_dir(){
    return properties.get("node_data_dir");
  },
  get_server_wlfile_dir(){
    return properties.get("server_wlfile_dir")
  },
  get_server_ycsb_dir(){
    return properties.get("server_ycsb_dir")
  },

  //ycsb
  get_ycsb_exporter(){
    return properties.get("ycsb_exporter")
  },
  get_ycsb_exportfile_dir(){
    return properties.get("ycsb_exportfile_dir")
  },
  get_ycsb_threadcount(){
    return properties.get("ycsb_threadcount")
  },
  get_ycsb_timewindow(){
    return properties.get("ycsb_timewindow")
  },

  //IO Tracer
  get_IO_output_dir(){
    return properties.get("IO_output_dir");
  },
  get_IO_driverManager_dir(){
    return properties.get("IO_driverManager_dir");
  },

  //version
  get_javaVersion(){
    return properties.get("javaVersion");
  },
  get_sshpassVersion(){
    return properties.get("sshpassVersion");
  },
  get_pythonVersion(){
    return properties.get("pythonVersion");
  },
  get_gitVersion(){
    return properties.get("gitVersion");
  },
  get_mavenVersion(){
    return properties.get("mavenVersion");
  }

}
