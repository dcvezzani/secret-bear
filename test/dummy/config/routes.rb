Rails.application.routes.draw do

  mount BcmsMy401kPresentation::Engine => "/bcms_my401k_presentation"

  mount_browsercms
end
